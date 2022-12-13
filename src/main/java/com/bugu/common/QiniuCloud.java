package com.bugu.common;

import com.qiniu.common.Zone;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.UploadManager;
import com.qiniu.util.Auth;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;


@Component
@ConfigurationProperties(prefix = "qiniu")
public class QiniuCloud {

    private String ak;

    private String sk;

    private String bucket;

    private String domain;

    public QiniuCloud() {
    }

    public QiniuCloud(String ak, String sk, String bucket, String domain) {
        this.ak = ak;
        this.sk = sk;
        this.bucket = bucket;
        this.domain = domain;
    }

    public String getAk() {
        return ak;
    }

    public void setAk(String ak) {
        this.ak = ak;
    }

    public String getSk() {
        return sk;
    }

    public void setSk(String sk) {
        this.sk = sk;
    }

    public String getBucket() {
        return bucket;
    }

    public void setBucket(String bucket) {
        this.bucket = bucket;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public String getToken() {
        Auth auth = Auth.create(ak, sk);
        return auth.uploadToken(bucket);
    }

    @Override
    public String toString() {
        return "QiniuCloud{" +
                "ak='" + ak + '\'' +
                ", sk='" + sk + '\'' +
                ", bucket='" + bucket + '\'' +
                ", domain='" + domain + '\'' +
                '}';
    }
}

