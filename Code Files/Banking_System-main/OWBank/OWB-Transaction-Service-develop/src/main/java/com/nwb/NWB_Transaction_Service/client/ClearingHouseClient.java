package com.nwb.NWB_Transaction_Service.client;

import com.nwb.NWB_Transaction_Service.dto.TransactionRequest;
import com.nwb.NWB_Transaction_Service.exception.ClearingHouseException;

public interface ClearingHouseClient {
    void sendTransaction(TransactionRequest transaction) throws ClearingHouseException;
}
