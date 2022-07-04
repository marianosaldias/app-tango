export interface JwtResponseI {
    dataUser: {
      id: string,
      firstName: string,
      email: string,
      accessToken: string,
      expiresIn: string
    }
}