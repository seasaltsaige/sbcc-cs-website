export class ElectionHelper {
  static validCodes: string[] = [];
  private static usedCodes: string[] = [];
  static votedIps: string[] = [];

  static createCodes(numCodes: number) {
    const charArr: string[] = [];
    for (let i = 0; i < numCodes; i++) {
      const code = this.createCode();
      this.validCodes.push(code);
      charArr.push(code);
    }
    return charArr;
  }

  static invalidateCode(code: string) {
    const index = this.validCodes.findIndex((val) => val === code);
    if (index === -1) return null;
    this.validCodes.splice(index, 1);
    this.usedCodes.push(code);
    return true;
  }


  static hasVotedIp(ip: string): boolean {
    if (!this.votedIps.includes(ip)) {
      this.logIp(ip);
      return false;
    } else return true;
  }

  static clearData() {
    this.validCodes = [];
    this.usedCodes = [];
    this.votedIps = [];
  }


  // Private
  private static createCode() {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@#$%&";
    let code = "";
    for (let i = 0; i < 4; i++) {
      const i = Math.floor(Math.random() * chars.length);
      code += chars[i];
    }

    return code;
  }


  private static logIp(ip: string) {
    this.votedIps.push(ip);
  }

}