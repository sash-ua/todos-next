
export type Lists = Array<List>;

export type List = {
    id: number,
    name: string,
    description: string,
    priority: string,
    tasks: Task[]
}
export type Task = {
    priority: string,
    description: string,
    start: Date,
    dueDate: Date
}
export type AddItemData = {
    addListVisible: boolean,
    listVisible: boolean,
    taskVisible: boolean,
    prevlistID: number | undefined,
    listID: number | undefined,
    prevtaskID: number | undefined,
    taskID: number | undefined
};
export type AuthConfig = {
    first?: {name: string, type: string},
    second?: {name: string, type: string},
    txtArea?: {name: string, type: string},
    dueDate?: Date | undefined;
    priority?: string,
    btnName: string,
    active: string};

export interface StateStore {
    theme: any;
    themeDefault: any;
    themeDark: any;
    data: Lists | Array<List>;
    connected: undefined | string;
    authInfo: {hash: number | undefined, active: string};
    userName: string;
    addItem: AddItemData;
    listData: AuthConfig | undefined;
    taskData: AuthConfig;
    editedListValueCnfg: {first: string, second?: string, txtArea: string, priority: boolean};
    editedTaskValueCnfg: {first: string, second?: string, txtArea: string, dueDate: any, priority: boolean};
    addAuth: boolean;
    overlayOn: boolean;
    sideNav: boolean;
    isVisible: boolean;
    mdlWindow: boolean;
    mdlWindowConfig: object;
    formInitData: AuthConfig | undefined;
    LOG_IN_AUTH_CNFG: AuthConfig;
    SIGN_IN_AUTH_CNFG: AuthConfig;
    RESET_AUTH_CNFG: AuthConfig;
    TASK_CNFG: AuthConfig;
    LIST_CNFG: AuthConfig;
}

// App's interface Light theme config.
export const themeDefault = {
    name: 'themeDefault',
    btn: '#cfd8dc',
    // Main background-color is in sidenav
    bg: '#e0e0e0',
        nav: {
        bg: '#cfd8dc',
            color: 'rgba(0,0,0,.82)',
            onLineIco: '#00ff11',
            offLineIco: '#546e7a',
            sttngsIco: '#546e7a',
    },
    sidenav: {color: '#fff', bg: '#fgfgfg'},
    main: {
        bg: '#f7f7f7',
            listBtn: 'warn',
            colorList: 'rgba(0,0,0,.82)',
            taskBtn: 'primary',
            colorTask: 'rgba(0,0,0,.82)',
            dNd: 'primary',
            expand: 'primary'
    },
    action: {
        color: 'primary'
    }
};
export const themeDark = {
    name: 'themeDark',
    btn: '#3f51b5',
    // Main background-color is in sidenav
    bg: '#3f51b5',
    nav: {
        bg: '#757de8',
        color: 'rgba(0,0,0,.82)',
        onLineIco: '#00ff11',
        offLineIco: '#4d00ff',
        sttngsIco: '#4d00ff',
    },
    sidenav: {color: '#fff', bg: '#fgfgfg'},
    main: {
        bg: '#002984',
        listBtn: 'accent',
        colorList: 'rgba(240,240,240,.87)',
        taskBtn: 'primary',
        colorTask: 'rgba(240,240,240,.87)',
        dNd: 'primary',
        expand: 'primary'
    },
    action: {
        color: 'primary'
    }
};

// Initial store state.
export const INIT_STATE: StateStore = {
    // App's interface the theme configs.
    theme: themeDefault,
    themeDark: themeDark,
    themeDefault: themeDefault,
    // User's data.
    data: [],
    // Icon online / offline. If `true` online icon
    connected: undefined,
    // Entered `email` and `password` in AuthComponent if valid.
    authInfo: {hash: undefined, active: ''},
    // Current user name.
    userName: 'guest',
    // If `true` add task/list component appears.
    addItem: {
        // It's show add list component.
        addListVisible: false,
        // Open add
        listVisible: false,
        taskVisible: false,
        // Previous list id. It's buffer to remove previously opened add/edit list component
        prevlistID: undefined,
        // Current list id. This id is bound with opened add/edit list component.
        listID: undefined,
        // Previous task id. It's buffer to remove previously opened add/edit task component.
        prevtaskID: undefined,
        // Current task id. This id is bound with opened add/edit task component.
        taskID: undefined},
    // Current configuration of UniversalComponent while add / edit list, task
    listData: {
        first: {name: '', type: ''} ,
        txtArea: {name: '', type: ''},
        priority: '',
        btnName: '',
        active: ''
    },
    taskData: {
        txtArea: {name: '', type: ''},
        priority: '',
        dueDate: undefined,
        btnName: '',
        active: ''
    },
    // Default `form` config `list.form.component`
    editedListValueCnfg: {first: '', second: '', txtArea: '', priority: false},
    // Default `form` config `task.form.component`
    editedTaskValueCnfg: {first: '', second: '', txtArea: '', dueDate: '', priority: false},
    // If `true` AuthComponent appears.
    addAuth: false,
    // Sidenav open/close.
    sideNav: false,
    // Overlay on/off (true/false).
    overlayOn: false,
    // If `true` `form`(AuthFormValidationComponent) appears in AuthComponent.
    isVisible: false,
    // If `true` appears modal window (MdlWindowComponent)
    mdlWindow: false,
    // Modal window configuration.
    mdlWindowConfig: {header: 'error', msg: '', timeOut: 0},
    // Current configuration of UniversalComponent while logging and add / edit list, task
    formInitData: {
        first: {name: '', type: ''} ,
        second: {name: '', type: ''},
        btnName: '',
        active: ''
    },
    // Configuration of UniversalComponent while LogIn
    LOG_IN_AUTH_CNFG: {
        first: {name: 'email', type: 'email'} ,
        second: {name: 'password', type: 'password'},
        btnName: 'log in',
        active: 'logIn'
    },
    // Configuration of UniversalComponent while SignIn
    SIGN_IN_AUTH_CNFG: {
        first: {name: 'email', type: 'email'} ,
        second: {name: 'password', type: 'password'},
        btnName: 'sign in',
        active: 'signIn'
    },
    // Configuration of UniversalComponent while resetting password, stage 1
    RESET_AUTH_CNFG: {
        first: {name: 'email', type: 'txt'},
        second: {name: '', type: ''},
        btnName: 'reset password',
        active: 'reset'
    },
    // Config. for new task creation and editing
    TASK_CNFG: {
        txtArea: {name: 'description', type: 'text'},
        priority: 'primary',
        dueDate: new Date(),
        btnName: 'save',
        active: 'task'
    },
    // Config. for new list creation and editing
    LIST_CNFG: {
        first: {name: 'name', type: 'text'} ,
        txtArea: {name: 'description', type: 'text'},
        priority: 'primary',
        btnName: 'save',
        active: 'list'
    },
};

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
