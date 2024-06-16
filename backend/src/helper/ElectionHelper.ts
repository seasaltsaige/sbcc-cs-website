export class ElectionHelper {
  static votedIps: string[] = [];

  static hasVotedIp(ip: string): boolean {
    if (!this.votedIps.includes(ip)) {
      this.logIp(ip);
      return false;
    } else return true;
  }

  static clearData() {
    this.votedIps.length = 0;
  }

  private static logIp(ip: string) {
    this.votedIps.push(ip);
  }

}