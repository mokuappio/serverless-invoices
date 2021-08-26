import data from '@/services/data.service';
import Team from '@/store/models/team';

class TeamService {
  async getTeam() {
    let team = await data.get('team');
    if (!team) {
      team = new Team();
      await this.updateTeam(team);
    }

    return team;
  }

  async updateTeam(team) {
    return data.put('team', team);
  }
}

export default new TeamService();
