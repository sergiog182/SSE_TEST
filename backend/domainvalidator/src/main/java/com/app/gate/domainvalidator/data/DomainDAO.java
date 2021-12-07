package com.app.gate.domainvalidator.data;

import com.app.gate.domainvalidator.entities.Domain;

import java.util.List;

public interface DomainDAO {

    public List<Domain> findAll();

    public Domain findDomainById(int id);

    public Domain findByDomain(String domain);

    public void insertDomain(Domain domain);

    public void updateDomain(Domain domain);

    public void deleteDomain(Domain domain);

    public List<Domain> findAllSimilarTo(String domain, int actualDomain);

    public List<Domain> findAllSimilarToPuny(String domain, int actualDomain);

    public int getMaxId();

}
