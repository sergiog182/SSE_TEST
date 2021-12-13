package com.app.gate.domainvalidator.entities;

import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "validated_domains")
@NamedQueries({
        @NamedQuery(name = "ValidatedDomain.findByDomainString", query = "SELECT vd FROM ValidatedDomain vd WHERE vd.domainString = :domainstring")
})
public class ValidatedDomain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "domain_string", nullable = false, unique = true)
    private String domainString;

    @Column(name = "actual_domain", nullable = false, unique = true)
    private int actualDomain;

    @Column(name = "similar_domains", columnDefinition = "character_varying[]")
    private String similarDomains;

    @Column(name = "similar_domains_puny")
    private String similarDomainsPuny;

    public ValidatedDomain() {
    }

    public ValidatedDomain(String domainString, int actualDomain, String similarDomains, String similarDomainsPuny) {
        this.domainString = domainString;
        this.actualDomain = actualDomain;
        this.similarDomains = similarDomains;
        this.similarDomainsPuny = similarDomainsPuny;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDomainString() {
        return domainString;
    }

    public void setDomainString(String domainString) {
        this.domainString = domainString;
    }

    public int getActualDomain() {
        return actualDomain;
    }

    public void setActualDomain(int actualDomain) {
        this.actualDomain = actualDomain;
    }

    public String getSimilarDomains() {
        return similarDomains;
    }

    public void setSimilarDomains(String similarDomains) {
        this.similarDomains = similarDomains;
    }

    public String getSimilarDomainsPuny() {
        return similarDomainsPuny;
    }

    public void setSimilarDomainsPuny(String similarDomainsPuny) {
        this.similarDomainsPuny = similarDomainsPuny;
    }
}
