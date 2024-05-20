#!/usr/bin/env node

import { apiUrl, webUrl } from "../constants.js";
import { ajax_request } from "../requests.js";
import { getLS, saveLS, deleteLS } from "../cookies";