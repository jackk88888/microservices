package com.gunes.vo.base;

import java.util.Date;

public class CreatableBaseVO extends IdBaseVO{

    private Date createdAt;

    private String createdBy;

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(final Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(final String createdBy) {
        this.createdBy = createdBy;
    }
}
