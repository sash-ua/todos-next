import {FB} from '../firebase/firebase.cnfg';
import {INIT_STATE} from '../store/store.init';

export  const ENV = {
    production: process.env.ENV,
    firebase: FB,
    store: INIT_STATE
};

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
