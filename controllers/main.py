from odoo import http
from odoo.http import request

class HelloDashboard(http.Controller):
    @http.route('/hello_dashboard', type='http', auth="user", website=False)
    def hello_dashboard(self, **kw):
        return request.render("hello_dashboard.hello_dashboard_template", {})