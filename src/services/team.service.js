import storage from 'localforage';

class TeamService {
  async getTeam() {
    let team = await storage.getItem('team');
    if (!team) {
      team = {
        company_name: null,
        company_address: null,
        company_postal_code: null,
        company_country: null,
        company_county: null,
        company_city: null,
        company_reg_no: null,
        company_vat_no: null,
        website: null,
        contact_email: null,
        contact_phone: null,
        vat_rate: null,
        invoice_late_fee: null,
        invoice_due_days: null,
        updated_at: null,
        created_at: null,
        logo_url: null,
      };
    }

    return team;
  }

  async updateTeam(team) {
    return storage.setItem('team', team);
  }
}

export default new TeamService();
