import TeamService from '@/services/team.service';
import InvoiceService from '@/services/invoice.service';
import ClientService from '@/services/client.service';
import TaxService from '@/services/tax.service';
import { uuidv4 } from '@/utils/helpers';

class MigrationService {
  async migrate() {
    // Check if using old data structure
    const team = await TeamService.getTeam();
    if ('vat_rate' in team) {
      console.log('old format. doing migration');
      await this.migrateTaxes(team);
      await this.migrateTeam(team);
      await this.migrateClients();
      await this.migrateInvoices();
    }
  }

  async migrateTaxes(team) {
    console.log('migrating taxes');
    if (parseFloat(team.vat_rate)) {
      const tax = {
        id: uuidv4(),
        label: 'VAT',
        value: team.vat_rate,
      };
      console.log('creating tax', tax);
      await TaxService.setTaxes([tax]);
    }
  }

  async migrateTeam(team) {
    console.log('migrating team');
    team.fields = this.generateTeamFields(team);

    // Delete team old fields
    delete team.vat_rate;
    delete team.company_reg_no;
    delete team.company_vat_no;

    // Save data
    console.log('saving team', team);
    await TeamService.updateTeam(team);
  }

  generateTeamFields(team) {
    const fields = [];
    if (team.company_reg_no) {
      fields.push({
        id: 'team-field-reg',
        team_id: team.id,
        label: 'Reg no',
        value: team.company_reg_no,
      });
    }
    if (team.company_vat_no) {
      fields.push({
        id: 'team-field-vat',
        team_id: team.id,
        label: 'VAT no',
        value: team.company_vat_no,
      });
    }
    console.log('generated team fields', fields);
    return fields;
  }

  generateClientFields(client) {
    const fields = [];
    if (client.company_reg_no) {
      fields.push({
        id: `client-field-reg-${client.id}`,
        client_id: client.id,
        label: 'Reg no',
        value: client.company_reg_no,
      });
    }
    if (client.company_vat_no) {
      fields.push({
        id: `client-field-vat-${client.id}`,
        client_id: client.id,
        label: 'VAT no',
        value: client.company_vat_no,
      });
    }
    console.log('generated client fields', fields);
    return fields;
  }

  generateInvoiceClientFields(invoice) {
    const fields = [];
    if (invoice.client_reg_no) {
      fields.push({
        id: uuidv4(),
        invoice_id: invoice.id,
        client_field_id: `client-field-reg-${invoice.client_id}`,
        label: 'Reg no',
        value: invoice.client_reg_no,
      });
    }
    if (invoice.client_vat_no) {
      fields.push({
        id: uuidv4(),
        invoice_id: invoice.id,
        client_field_id: `client-field-vat-${invoice.client_id}`,
        label: 'VAT no',
        value: invoice.client_vat_no,
      });
    }
    console.log('generated invoice client fields', fields);
    return fields;
  }

  generateInvoiceTeamFields(invoice) {
    const fields = [];
    if (invoice.from_reg_no) {
      fields.push({
        id: uuidv4(),
        invoice_id: invoice.id,
        team_field_id: 'team-field-reg',
        label: 'Reg no',
        value: invoice.from_reg_no,
      });
    }
    if (invoice.from_vat_no) {
      fields.push({
        id: uuidv4(),
        invoice_id: invoice.id,
        team_field_id: 'team-field-vat',
        label: 'VAT no',
        value: invoice.from_vat_no,
      });
    }
    console.log('generated invoice team fields', fields);
    return fields;
  }

  async migrateClients() {
    const clients = await ClientService.getClients();
    console.log('migrating clients', clients);
    // eslint-disable-next-line no-restricted-syntax
    for (const client of clients) {
      // eslint-disable-next-line no-await-in-loop
      await this.migrateClient(client);
    }
  }

  async migrateClient(client) {
    console.log('migrating client', client);
    client.fields = this.generateClientFields(client);

    client.has_tax = !!((client.has_vat || client.has_vat === null));

    // Delete team old fields
    delete client.has_vat;
    delete client.company_reg_no;
    delete client.company_vat_no;

    // Save data
    console.log('saving client', client);
    await ClientService.updateClient(client);
  }

  async migrateInvoices() {
    const invoices = await InvoiceService.getInvoices();
    console.log('migrating invoices', invoices);
    // eslint-disable-next-line no-restricted-syntax
    for (const invoice of invoices) {
      // eslint-disable-next-line no-await-in-loop
      await this.migrateInvoice(invoice);
    }
  }

  async migrateInvoice(invoice) {
    console.log('migrating invoice', invoice);
    invoice.client_fields = this.generateInvoiceClientFields(invoice);
    invoice.team_fields = this.generateInvoiceTeamFields(invoice);

    if (parseFloat(invoice.vat_rate)) {
      invoice.rows = invoice.rows.map(row => this.addTaxToRow(row, invoice.vat_rate));
    }

    // Delete team old fields
    delete invoice.vat_rate;
    delete invoice.from_reg_no;
    delete invoice.from_vat_no;
    delete invoice.client_reg_no;
    delete invoice.client_vat_no;

    console.log('saving invoice', invoice);
    await InvoiceService.updateInvoice(invoice);
  }

  addTaxToRow(row, rate) {
    row.taxes = [{
      id: uuidv4(),
      row_id: row.id,
      label: 'VAT',
      value: rate,
    }];
    return row;
  }
}

export default new MigrationService();
