package com.gunes.vo.base;

public class BaseStatusVO extends UpdatableBaseVO {

    private String status = Status.ACTIVE.name();

    public String getStatus() {
        return status;
    }

    public void setStatus(final String status) {
        this.status = status;
    }
}
