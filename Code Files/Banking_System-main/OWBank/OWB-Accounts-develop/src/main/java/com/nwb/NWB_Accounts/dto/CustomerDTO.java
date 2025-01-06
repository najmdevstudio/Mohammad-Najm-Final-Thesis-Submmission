package com.nwb.NWB_Accounts.dto;

public record CustomerDTO(
        String firstName,
        String lastName,
        String ifscCode,
        String address
) {
}
