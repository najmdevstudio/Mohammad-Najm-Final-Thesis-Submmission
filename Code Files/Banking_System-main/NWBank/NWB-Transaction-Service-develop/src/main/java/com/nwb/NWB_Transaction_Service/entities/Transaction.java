package com.nwb.NWB_Transaction_Service.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.concurrent.atomic.AtomicInteger;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "NWB_Transactions", schema = "NWBank")
public class Transaction {

    private static final AtomicInteger count = new AtomicInteger();


    @Id
    @Column(name = "Id", nullable = false)
    private Integer Id;

    @Column(name = "fromAccount", nullable = false, length = 45)
    private String fromAccount;

    @Column(name = "toAccount", nullable = false, length = 45)
    private String toAccount;

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;


    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "recordTime", nullable = false)
    private Instant recordTime;

    public Transaction(String fromAccount, String toAccount, BigDecimal amount) {
        this.Id = count.incrementAndGet();
        this.fromAccount = fromAccount;
        this.toAccount = toAccount;
        this.amount = amount;
        this.recordTime = Instant.now();
    }

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public String getFromAccount() {
        return fromAccount;
    }

    public void setFromAccount(String fromAccount) {
        this.fromAccount = fromAccount;
    }

    public String getToAccount() {
        return toAccount;
    }

    public void setToAccount(String toAccount) {
        this.toAccount = toAccount;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Instant getRecordTime() {
        return recordTime;
    }

    public void setRecordTime(Instant recordTime) {
        this.recordTime = recordTime;
    }
}