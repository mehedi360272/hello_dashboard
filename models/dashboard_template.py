from odoo import models, api

class DashboardTemplate(models.Model):
    _name = 'dashboard.template'

    @api.model
    def get_data(self):
        product_count = self.env['product.template'].search_count([('type', '=', 'consu')])
        return {
            'product_count': product_count,
        }
