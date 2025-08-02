/** @odoo-module **/  // Odoo কে জানিয়ে দেয় যে এটি একটি JS module যা Odoo system দ্বারা ব্যবহৃত হবে।

// Web client এর registry থেকে registry system import করা হয়, যেখানে আমাদের component টি register করবো
import { registry } from "@web/core/registry";

// Component তৈরি করার জন্য OWL এর Component class এবং lifecycle hook 'onWillStart' import করা হচ্ছে
import { Component, onWillStart } from "@odoo/owl";

// Odoo services (orm, action, etc.) ব্যবহার করতে হলে useService hook ব্যবহার করতে হয়
import { useService } from "@web/core/utils/hooks";

// Custom Component class তৈরি করা হচ্ছে
class HelloDashboard extends Component {

    // Component এর setup method - এখানে state ও services setup করা হয়
    setup() {
        // ORM service - এর মাধ্যমে backend এর মডেলের সাথে যোগাযোগ করা যায় (RPC call এর মতো)
        this.orm = useService("orm");

        // Action service - অন্য view/action open করার জন্য ব্যবহৃত হয়
        this.action = useService("action");

        // Component এর reactive state object যেখানে ডেটা রাখা হবে
        this.state = {
            product_count: 0,  // প্রাথমিকভাবে ০ সেট করা হলো
        };

        // Component এর rendering এর আগে যেই code রান হবে তা onWillStart এর ভিতরে রাখা হয়
        onWillStart(async () => {
            // dashboard.template মডেলের get_data method কে call করা হচ্ছে ORM service দিয়ে
            const result = await this.orm.call("dashboard.template", "get_data", []);
            // প্রাপ্ত result থেকে product_count state এ সেট করা হচ্ছে
            this.state.product_count = result.product_count;
        });
    }

    // View All বাটনে ক্লিক করলে এই method চলবে
    async viewAll() {
        // Action service ব্যবহার করে ir.actions.act_window টাইপের একটি action execute করা হচ্ছে
        await this.action.doAction({
            type: "ir.actions.act_window",  // এটা একটি typical Odoo action টাইপ
            name: "Consumable Products",    // Action এর title হবে এটি
            res_model: "product.template",  // যে মডেলের ডেটা দেখাবে
            views: [
                [false, 'list'],  // প্রথমে list view দেখাবে
                [false, 'form'],  // তারপর fallback হিসেবে form view থাকবে
            ],
            domain: [["type", "=", "consu"]],  // শুধু consumable টাইপের প্রোডাক্ট দেখাবে
            target: "current",  // বর্তমান window তেই ভিউ ওপেন হবে
        });
    }
}

// Component টির জন্য ব্যবহৃত XML template এর নাম define করা হলো
HelloDashboard.template = "hello_dashboard.HelloDashboard";

// Component টিকে Odoo এর registry তে 'actions' category তে register করা হচ্ছে,
// যাতে XML বা Python থেকে এই component কে call করা যায়
registry.category("actions").add("hello_dashboard_tag", HelloDashboard);
