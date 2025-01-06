package com.nwb.NWB_Transaction_Service.constants;

import org.springframework.beans.factory.annotation.Value;

public abstract class Constants {
    private Constants() {}


    public static final String ACCOUNT_SERVICE_URL="http://accounts-pwb:8200";
    public static final String FROM_ACCOUNT_INVALID="From Account is invalid";
    public static final String TO_ACCOUNT_INVALID="To Account is invalid";
    public static final String FROM_ACCOUNT_INACTIVE="From Account is inactive";
    public static final String TO_ACCOUNT_INACTIVE="To Account is inactive";
    public static final String INSUFFICIENT_BALANCE="The Account you are sending from has insufficient balance";
    public static final String TRANSACTION_NOT_FOUND="Transaction not found with id=";


}
