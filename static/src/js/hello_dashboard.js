/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, onWillStart } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

class HelloDashboard extends Component {
    setup() {
        this.orm = useService("orm");
        this.action = useService("action");

        this.state = {
            product_count: 0,
        };

        onWillStart(async () => {
            const result = await this.orm.call("dashboard.template", "get_data", []);
            this.state.product_count = result.product_count;
        });
    }

    goToProductList() {
        this.action.doAction('product.product_template_action_all');
    }
}

HelloDashboard.template = "hello_dashboard.HelloDashboard";
registry.category("actions").add("hello_dashboard_tag", HelloDashboard);
