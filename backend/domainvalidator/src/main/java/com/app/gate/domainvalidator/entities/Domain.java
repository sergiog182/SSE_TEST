package com.app.gate.domainvalidator.entities;

import javax.persistence.*;

@Entity
@Table(name = "domains")
@NamedQueries({
        @NamedQuery(name = "Domains.findAll", query = "SELECT d FROM Domain d"),
        @NamedQuery(name = "Domains.findByDomain", query = "SELECT d FROM Domain d WHERE d.domain = :domain"),
        @NamedQuery(name = "Domains.findBySimilarDomains", query = "SELECT d FROM Domain d WHERE (d.domain like :pattern or d.domain like :secondPattern) and d.punycode = false and d.id > :maxid"),
        @NamedQuery(name = "Domains.findAllDomainsPuny", query = "SELECT d FROM Domain d WHERE d.punycode = true and d.id > :maxid"),
        @NamedQuery(name = "Domains.findMaxId", query = "SELECT MAX(d.id) FROM Domain d")
})
public class Domain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "domain", nullable = false, unique = true)
    private String domain;

    @Column(name = "punycode", nullable = false)
    private boolean punycode;

    public Domain() {
    }

    public Domain(String domain, boolean punycode) {
        this.domain = domain;
        this.punycode = punycode;
    }

    public Domain(int id, String domain) {
        this.id = id;
        this.domain = domain;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public boolean isPunycode() {
        return punycode;
    }

    public void setPunycode(boolean punycode) {
        this.punycode = punycode;
    }
}
