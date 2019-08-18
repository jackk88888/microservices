package com.gunes.vo.base;

import java.util.Date;

public class UpdatableBaseVO extends CreatableBaseVO {

    private Date updatedAt;

    private String updatedBy;

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(final Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(final String updatedBy) {
        this.updatedBy = updatedBy;
    }
}
