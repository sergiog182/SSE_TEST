package com.app.gate.domainvalidator.data;

import com.app.gate.domainvalidator.entities.Domain;
import com.app.gate.domainvalidator.entities.ValidatedDomain;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

@Component
public class ValidatedDomainDAOImpl implements ValidatedDomainDAO{

    @PersistenceContext
    private EntityManager em;

    @Override
    public ValidatedDomain findByDomainString(String domain) {
        ValidatedDomain validatedDomainFound = null;
        try {
            validatedDomainFound = (ValidatedDomain) em.createNamedQuery("ValidatedDomain.findByDomainString").setParameter("domainstring", domain).getSingleResult();
        } catch (NoResultException ex) {
            // not found
        }
        return validatedDomainFound;

    }

    @Override
    public void insertValidatedDomain(ValidatedDomain validatedDomain) {
        em.persist(validatedDomain);
    }

    @Override
    public void updateValidatedDomain(ValidatedDomain validatedDomain) {
        em.merge(validatedDomain);
    }

}
