export interface Area {
    [index: string]: string
}

export interface AreaInfo {
    [index: string]: Area
}

export interface RegionInfo {
    [index: string]: string
}

export interface Device {
    region: string;
    area: string;
    ID: number;
    description: string;
    idevice?: number;
}

export interface DevicesInfo {
    areaInfo: AreaInfo;
    devices: Device[];
    message: string;
    regionInfo: RegionInfo;
}

export interface Journal {
    device: string;
    arm: string;
    status: string;
    rez: string;
    phase: string;
    nk: string;
    ck: string;
    pk: string;
    note: string;
}

export interface Log {
    time: Date;
    id: number;
    text: string;
    type: number;
    journal: Journal;
}

export interface DeviceLogs {
    [index: string]: Log[];
}

// export interface DevToSend {
//     idevice?: number;
//     region: string;
//     area: string;
//     ID: number;
//     description: string;
// }

export interface DevLogsSlice {
    devices: Device[];
    logs: DeviceLogs;
    selectedType: number;
    dividers: Divider[];
    pageSize: number;
    page: number;
    logFileName: string;
}

export interface Divider {
    description: string;
    num: number;
}


//
// export interface TableLog {
//     id: number,
//     dateStart: string,
//     dateEnd: string,
//     duration: string,
//     message: string,
//     device: string,
//     arm: string,
//     status: string,
//     rez: string,
//     phase: string,
//     nk: string,
//     ck: string,
//     pk: string,
// }