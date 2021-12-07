package com.app.gate.domainvalidator.beans;

import java.util.ArrayList;
import java.util.List;

public class SimilarResponse {
    private String dominio;
    private List<String> dominios_similares;
    private List<String> dominios_sim_punycode;

    public SimilarResponse(){

    }

    public SimilarResponse(String dominio) {
        this.dominio = dominio;
    }

    public String getDominio() {
        return dominio;
    }

    public void setDominio(String dominio) {
        this.dominio = dominio;
    }

    public List<String> getDominios_similares() {
        if (dominios_similares == null) {
            dominios_similares = new ArrayList<>();
        }
        return dominios_similares;
    }

    public void setDominios_similares(List<String> dominios_similares) {
        this.dominios_similares = dominios_similares;
    }

    public List<String> getDominios_sim_punycode() {
        if (dominios_sim_punycode == null) {
            dominios_sim_punycode = new ArrayList<>();
        }
        return dominios_sim_punycode;
    }

    public void setDominios_sim_punycode(List<String> dominios_sim_punycode) {
        this.dominios_sim_punycode = dominios_sim_punycode;
    }
}
