package com.app.gate.domainvalidator.service;

import com.app.gate.domainvalidator.entities.Domain;
import org.springframework.web.multipart.MultipartFile;
import com.app.gate.domainvalidator.beans.SimilarResponse;
import java.util.List;

public interface DomainService {

    public Domain findDomain(int id);

    public List<Domain> findAllDomains();

    public int uploadFile(MultipartFile file);

    public SimilarResponse findSimilarDomains(String domain);

}
