package com.nwagebank.nwb_clearinghouse.services;

import com.nwagebank.nwb_clearinghouse.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class BankRegistryServiceImpl implements BankRegistryService {
    private final Map<String, String> bankServiceUrls;

    public BankRegistryServiceImpl() {
        bankServiceUrls = Map.of(
                "NWB0001","http://transaction-nwb:8300/",
                "OWB0001","http://transaction-owb:8300/",
                "PWB0001","http://transaction-pwb:8300/"
        );
    }

    public String getBankTransactionServiceUrl(String ifscCode) {
        return Optional.ofNullable(bankServiceUrls.get(ifscCode))
                .orElseThrow(()-> new ResourceNotFoundException("Bank not found for IFSC Code:"+ifscCode));
    }

}
