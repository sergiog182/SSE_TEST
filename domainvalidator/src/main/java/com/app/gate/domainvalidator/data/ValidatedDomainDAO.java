package com.app.gate.domainvalidator.data;

import com.app.gate.domainvalidator.entities.ValidatedDomain;

public interface ValidatedDomainDAO {

    public ValidatedDomain findByDomainString(String domain);

    public void insertValidatedDomain(ValidatedDomain validatedDomain);

    public void updateValidatedDomain(ValidatedDomain validatedDomain);

}
