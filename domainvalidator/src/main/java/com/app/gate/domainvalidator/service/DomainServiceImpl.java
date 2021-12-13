package com.app.gate.domainvalidator.service;

import com.app.gate.domainvalidator.beans.SimilarResponse;
import com.app.gate.domainvalidator.data.DomainDAOImpl;
import com.app.gate.domainvalidator.data.ValidatedDomainDAOImpl;
import com.app.gate.domainvalidator.entities.Domain;
import com.app.gate.domainvalidator.entities.ValidatedDomain;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class DomainServiceImpl implements DomainService {

    @Autowired
    DomainDAOImpl domainRepo;

    @Autowired
    ValidatedDomainDAOImpl validatedDomainRepo;

    @Override
    public Domain findDomain(int id) {
        return domainRepo.findDomainById(id);
    }

    @Override
    public List<Domain> findAllDomains() {
        return domainRepo.findAll();
    }

    @Override
    @Transactional
    public int uploadFile(MultipartFile file) {
        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        int status = 200;

        if (extension.equals(".txt")) {
            String line;
            try {
                InputStream is = file.getInputStream();
                if (is != null) {
                    BufferedReader reader = new BufferedReader(new InputStreamReader(is));
                    while ((line = reader.readLine()) != null) {
                        Domain tmp = domainRepo.findByDomain(line);
                        if (tmp == null) {
                            if (line.startsWith("xn--")) {
                                domainRepo.insertDomain(new Domain(line, true));
                            } else {
                                domainRepo.insertDomain(new Domain(line, false));
                            }
                        }
                    }
                }
                is.close();
                status = 204;
            } catch (IOException e) {
                status = 500;
                e.printStackTrace();
            }
        } else {
            status = 400;
            System.out.println("File is not txt");
        }

        return status;
    }

    @Override
    @Transactional
    public SimilarResponse findSimilarDomains(String domain) {
        SimilarResponse response = new SimilarResponse(domain);
        ValidatedDomain validatedDomain = validatedDomainRepo.findByDomainString(domain);
        int actualDomain = 1;

        if (validatedDomain != null) {
            actualDomain = validatedDomain.getActualDomain();
            response.setDominios_similares(new ArrayList<>(Arrays.asList(validatedDomain.getSimilarDomains().split(";;"))));
            response.setDominios_sim_punycode(new ArrayList<>(Arrays.asList(validatedDomain.getSimilarDomainsPuny().split(";;"))));
        }

        List<Domain> domains = domainRepo.findAllSimilarTo(domain, actualDomain);

        for (Domain domainInDB : domains) {
            response.getDominios_similares().add(domainInDB.getDomain());
        }

        List<Domain> domainsPuny = domainRepo.findAllSimilarToPuny(domain, actualDomain);
        for (Domain domainInDBPuny : domainsPuny) {
            response.getDominios_sim_punycode().add(domainInDBPuny.getDomain());
        }

        int maxId = domainRepo.getMaxId();

        if (maxId > 0) {
            if (validatedDomain == null) {
                validatedDomain = new ValidatedDomain();
                validatedDomain.setDomainString(domain);
                validatedDomain.setSimilarDomains(String.join(";;", response.getDominios_similares()));
                System.out.println(response.getDominios_sim_punycode());
                System.out.println(String.join(";;", response.getDominios_sim_punycode()));
                validatedDomain.setSimilarDomainsPuny(String.join(";;", response.getDominios_sim_punycode()));
                validatedDomain.setActualDomain(maxId);

                validatedDomainRepo.insertValidatedDomain(validatedDomain);

            } else {
                if (maxId != actualDomain) {
                    validatedDomain.setActualDomain(maxId);
                    validatedDomain.setSimilarDomains(String.join(";;", response.getDominios_similares()));
                    validatedDomain.setSimilarDomainsPuny(String.join(";;", response.getDominios_sim_punycode()));
                    validatedDomainRepo.updateValidatedDomain(validatedDomain);
                }
            }
        }

        return response;
    }

    @Override
    public Domain searchDomain(String name) {
        return domainRepo.findByDomain(name);
    }
}
