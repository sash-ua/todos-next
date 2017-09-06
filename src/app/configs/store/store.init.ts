
export type Lists = Array<List>;

export type List = {
    id: number,
    name: string,
    description: string,
    priority: string,
    tasks: Task[]
}
export type Task = {
    id: number,
    priority: string,
    description: string,
    start: number,
    end: number
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
    endDate?: number;
    priority?: string,
    btnName: string,
    active: string};

export interface StateStore {
    data: Lists;
    connected: boolean;
    authInfo: {email: string, password: string};
    userName: string;
    addItem: AddItemData;
    listData: AuthConfig | undefined;
    taskData: AuthConfig | undefined;
    editedListValueCnfg: {first: string, second?: string, txtArea: string};
    editedTaskValueCnfg: {first: string, second?: string, txtArea: string};
    addAuth: boolean;
    overlayOn: boolean;
    isVisible: boolean;
    mdlWindow: boolean;
    mdlWindowConfig: object;
    formInitData: AuthConfig | undefined;
    LOG_AUTH_CNFG_COMP: AuthConfig;
    SIGN_AUTH_CNFG_COMP: AuthConfig;
    RESET_AUTH_CNFG_COMP: AuthConfig;
    TASK_CNFG: AuthConfig;
    LIST_CNFG: AuthConfig;
}

const lists: Lists = [
    {
        id: 0,
        name: 'Test fgdghdrhtyjyukuilk sthdyjyukyukku syjtukyku',
        description: 'Trossery list',
        priority: 'primary',
        tasks: [
            {
                id: 0,
                priority: 'warn',
                description: 'Torwfhewlrkjbwlekb 11    dfdddfdfsfrgerg gerghethethre',
                start: Date.now(),
                end: Date.now() + 100
            },
            {
                id: 1,
                priority: 'primary',
                description: 'Torwfhewlrkjbwlekb 11111rfgfwgrtgrt',
                start: Date.now(),
                end: Date.now() + 100
            }
        ]
    },
    {
        id: 1,
        name: 'test2',
        description: 'grossery list2',
        priority: 'warn',
        tasks: [{
            id: 0,
            priority: 'primary',
            description: 'torwfhewlrkjbwlekb',
            start: Date.now(),
            end: Date.now() + 200
        }]
    }
];

// Initial store state.
export const INIT_STATE: StateStore = {
    // User's data.
    data: lists,
    // Icon online / offline. If `true` online icon
    connected: false,
    // Entered `email` and `password` in AuthComponent if valid.
    authInfo: {email: '', password: ''},
    // Current user name.
    userName: 'guest',
    // If true list is folded
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
    listData: undefined,
    taskData: undefined,
    // Default `form` config `list.form.component`
    editedListValueCnfg: {first: '', second: '', txtArea: ''},
    // Default `form` config `task.form.component`
    editedTaskValueCnfg: {first: '', second: '', txtArea: ''},
    // If `true` AuthComponent appears.
    addAuth: false,
    // Overlay on/off (true/false).
    overlayOn: false,
    // If `true` `form`(AuthFormValidationComponent) appears in AuthComponent.
    isVisible: false,
    // If `true` appears modal window (MdlWindowComponent)
    mdlWindow: false,
    // Modal window configuration.
    mdlWindowConfig: {header: 'error', msg: '', timeOut: 0},
    // Current configuration of UniversalComponent while logging and add / edit list, task
    formInitData: undefined,
    // Configuration of AuthFormValidationComponent if it is as LogIn
    LOG_AUTH_CNFG_COMP: {
        first: {name: 'email', type: 'email'} ,
        second: {name: 'password', type: 'password'},
        btnName: 'log in',
        active: 'login'},
    // Configuration of AuthFormValidationComponent if it is as SignIn
    SIGN_AUTH_CNFG_COMP: {
        first: {name: 'email', type: 'email'} ,
        second: {name: 'password', type: 'password'},
        btnName: 'sign in',
        active: 'singin'},
    // Configuration of AuthFormValidationComponent if it is as Reset login(email)
    RESET_AUTH_CNFG_COMP: {
        first: {name: 'email', type: 'email'} ,
        btnName: 'send resetting email',
        active: 'reset'},
    // Config. for new task creation and editing
    TASK_CNFG: {
        txtArea: {name: 'description', type: 'text'},
        priority: 'primary',
        endDate: Date.now() + 86400000,
        btnName: 'save',
        active: 'task'
    },
    // Config. for new list creation and editing
    LIST_CNFG: {
        first: {name: 'name', type: 'text'} ,
        txtArea: {name: 'description', type: 'text'},
        priority: 'primary',
        btnName: 'save',
        active: 'list'},
};

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
