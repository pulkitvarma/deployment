import { ChangeEvent } from "react";

export interface scheduleTestProps {
    history: { push: Function },
    location: {
        state: {
            data: {
                email: string,
                scheduledDate: string,
                expiryDate: string,
                type: string,
                id: string,
                testStatus: string
            }
        }
    },
    match: {
        path: string
    }
}

export type formatDateFunc = (rows: Array<{
    scheduledDate: string,
    expiryDate: string
}>) => void;

export type rowsObjectArray = Array<rowsObject>;

export type rowsObject = {
    email: string,
    scheduledDate: { display: string, timestamp: Date },
    expiryDate: { display: string, timestamp: Date },
    testStatus: string,
    id: string,
    resend: string,
    cancel: string
}

export type settingSearchDataFunc = (searchData: { email: string, scheduledDate: string, expiryDate: string, id: string, testStatus: string, type: string }) => void;

export type settingDataFunc = (rows: rowsObjectArray) => void;

export type setGatDataFunc = (data: rowsObjectArray) => void;

export type setBptDataFunc = (data: rowsObjectArray) => void;

export type apiRows = {
    email: string, scheduledDate: string, expiryDate: string, id: string, testStatus: string
}

export type setSearchRowsFunc = (data: apiRows) => Array<apiRows>;

export type handleChangeFunc = (event: ChangeEvent, index: number) => void;