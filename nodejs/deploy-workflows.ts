import { ZBClient } from "zeebe-node";
import fs from "fs";
import path from "path";

// Uses Camunda Cloud credentials from the environment
const zbc = new ZBClient();

const basedir = "../bpmn";
const files = fs.readdirSync(basedir)?.map(f => path.join(basedir, f)) || [];

zbc.deployWorkflow(files).then(console.log);
