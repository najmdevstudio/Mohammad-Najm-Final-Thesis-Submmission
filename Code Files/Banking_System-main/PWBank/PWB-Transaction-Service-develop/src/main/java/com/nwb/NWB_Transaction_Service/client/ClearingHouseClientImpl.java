package com.nwb.NWB_Transaction_Service.client;

import com.nwb.NWB_Transaction_Service.dto.TransactionRequest;
import com.nwb.NWB_Transaction_Service.exception.ClearingHouseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@Service
public class ClearingHouseClientImpl implements ClearingHouseClient {

    private final WebClient webClient;

    @Autowired
    public ClearingHouseClientImpl(@Value("${clearinghouse.service.url}") String clearingHouseUrl) {
        this.webClient = WebClient.builder()
                .baseUrl(clearingHouseUrl)
                .build();
    }

    @Override
    public void sendTransaction(TransactionRequest request) throws ClearingHouseException {
        try {
            webClient.post()
                    .uri("/interbankTransactions")
                    .bodyValue(request)
                    .retrieve()
                    .onStatus(
                            status -> status.isError(),
                            response -> response.bodyToMono(String.class)
                                    .flatMap(errorBody -> Mono.error(new ClearingHouseException(errorBody)))
                    )
                    .bodyToMono(Void.class)
                    .block();
        }catch (WebClientResponseException ex) {
            throw new ClearingHouseException("Error response from clearing house: " + ex.getResponseBodyAsString(), ex);
        } catch (Exception ex) {
            throw new ClearingHouseException("Failed to communicate with clearing house", ex);
        }
    }
}
