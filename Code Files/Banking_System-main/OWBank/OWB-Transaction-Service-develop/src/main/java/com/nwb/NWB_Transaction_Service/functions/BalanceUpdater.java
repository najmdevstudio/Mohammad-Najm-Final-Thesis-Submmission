package com.nwb.NWB_Transaction_Service.functions;

import java.math.BigDecimal;

@FunctionalInterface
public interface BalanceUpdater {
    BigDecimal updateBalance(BigDecimal balance, BigDecimal amount);
}
