/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component } from "@odoo/owl";

class HelloDashboard extends Component {}

HelloDashboard.template = "hello_dashboard.HelloDashboard";

registry.category("actions").add("hello_dashboard_tag", HelloDashboard);