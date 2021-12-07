package com.app.gate.domainvalidator.data;

import com.app.gate.domainvalidator.entities.Domain;
import com.app.gate.domainvalidator.utils.Utilities;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import java.net.IDN;
import java.sql.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Component
public class DomainDAOImpl implements DomainDAO{

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Domain> findAll() {
        return em.createNamedQuery("Domains.findAll").getResultList();
    }

    @Override
    public Domain findDomainById(int id) {
        return em.find(Domain.class, id);

    }

    @Override
    public Domain findByDomain(String domain) {
        Domain foundDomain = null;
        try {
            foundDomain = (Domain) em.createNamedQuery("Domains.findByDomain").setParameter("domain", domain).getSingleResult();
        } catch (NoResultException ex) {
            // not found
        }
        return foundDomain;
    }

    @Override
    public void insertDomain(Domain domain) {
        em.persist(domain);
    }

    @Override
    public void updateDomain(Domain domain) {
        em.merge(domain);
    }

    @Override
    public void deleteDomain(Domain domain) {
        em.remove(em.merge(domain));
    }

    @Override
    public List<Domain> findAllSimilarTo(String domain, int actualDomain) {
        String pattern = generatePattern(domain, 1);
        String secondPattern = generatePattern(domain, 2);
        List<Domain> domains = em.createNamedQuery("Domains.findBySimilarDomains")
                .setParameter("pattern", pattern)
                .setParameter("secondPattern", secondPattern)
                .setParameter("maxid", actualDomain)
                .getResultList();
        return domains;
    }

    @Override
    public List<Domain> findAllSimilarToPuny(String domain, int actualDomain) {
        List<Domain> allDomainsPuny = em.createNamedQuery("Domains.findAllDomainsPuny")
                .setParameter("maxid", actualDomain)
                .getResultList();
        List<String> domainVariants = generateDomainVariants(domain);
        List<Domain> domains = new ArrayList<>();

        StringBuilder temporalBuilder;

        for (Domain domainPuny : allDomainsPuny) {
            temporalBuilder = new StringBuilder();
            temporalBuilder.append(IDN.toUnicode(domainPuny.getDomain()));

            for (String variant : domainVariants) {
                int difference = Utilities.calculateDifference(variant, temporalBuilder.toString());
                if (difference <= 10) {
                    domains.add(domainPuny);
                    break;
                }
            }
        }

        return domains;
    }

    private List<String> generateDomainVariants(String domain) {
        List<String> variants = new ArrayList<>();
        variants.add(domain.replaceAll("[a]", "α"));
        variants.add(domain.replaceAll("[b]", "в"));
        variants.add(domain.replaceAll("[c]", "ç"));
        variants.add(domain.replaceAll("[л]", "л"));
        variants.add(domain.replaceAll("[o]", "ф"));
        variants.add(domain.replaceAll("[n]", "и"));
        variants.add(domain.replaceAll("[b]", "ь"));

        String fullReplacement = domain
                .replaceAll("[a]", "α")
                .replaceAll("[b]", "в")
                .replaceAll("[c]", "ç")
                .replaceAll("[л]", "л");

        String secondFullReplacement = domain
                .replaceAll("[a]", "α")
                .replaceAll("[b]", "ь")
                .replaceAll("[c]", "ç")
                .replaceAll("[л]", "и")
                .replaceAll("[o]", "ф");

        variants.add(fullReplacement);
        variants.add(secondFullReplacement);
        return variants;
    }

    private String generatePattern(String domain, int command) {
        String[] parts = domain.split("\\.");
        StringBuilder pattern = new StringBuilder();
        pattern.append("%");

        switch(command) {
            case 1:
                pattern.append(parts[0].toLowerCase().replaceAll("[a,e,i,o,u]", "_"));
                break;
            case 2:
            default:
                pattern.append(parts[0].toLowerCase().replaceAll("[b,c,n,l]", "_"));
                break;
        }

        pattern.append("%");
        return pattern.toString();
    }

    @Override
    public int getMaxId() {
        return (int) em.createNamedQuery("Domains.findMaxId").getSingleResult();
    }
}
