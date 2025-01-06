package com.nwagebank.nwb_clearinghouse.services;

import com.nwagebank.nwb_clearinghouse.dto.InterbankTransactionResponse;
import com.nwagebank.nwb_clearinghouse.dto.TransactionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.logging.Logger;

@Service
public class InterbankTransactionServiceImpl implements InterbankTransactionService {
    private final BankRegistryService bankRegistryService;
    private final RestTemplate restTemplate;

    private final Logger logger = Logger.getLogger(InterbankTransactionServiceImpl.class.getName());

    @Autowired
    public InterbankTransactionServiceImpl(RestTemplate restTemplate, BankRegistryService bankRegistryService) {
        this.restTemplate = restTemplate;
        this.bankRegistryService = bankRegistryService;
    }

    public InterbankTransactionResponse processTransaction(TransactionRequest request) {
        String beneficiaryBankUrl=bankRegistryService.getBankTransactionServiceUrl(request.toIFSCCode());;

        ResponseEntity<InterbankTransactionResponse> response = restTemplate.postForEntity(
                beneficiaryBankUrl + "/transactions/receiveExternal",
                request,
                InterbankTransactionResponse.class
        );

        logger.info(response.getBody().toString());

        return response.getBody();
    }
}
