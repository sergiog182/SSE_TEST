package com.app.gate.domainvalidator.controllers;

import com.app.gate.domainvalidator.beans.SimilarResponse;
import com.app.gate.domainvalidator.entities.Domain;
import com.app.gate.domainvalidator.service.DomainServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/domains")
@CrossOrigin(origins = "*")
public class MainController {

    @Autowired
    DomainServiceImpl service;

    @GetMapping("/{id}")
    public Domain getDomainById(@PathVariable int id) {
        return service.findDomain(id);
    }

    @GetMapping("/")
    public List<Domain> getAllDomains() {
        return service.findAllDomains();
    }

    @PostMapping("/upload")
    public void uploadDomains(@RequestParam("file") MultipartFile file, HttpServletResponse response) {
        int status = service.uploadFile(file);
        response.setStatus(status);
    }

    @GetMapping("/similar/{domain}")
    public SimilarResponse getSimilarDomains(@PathVariable String domain) {
        return service.findSimilarDomains(domain);
    }


}
