function randomString(length: number) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  

export async function GET() {

    

    const response_type = 'code'
    const client_id = '496a07f9827045c88b10b89ff5923ae5'
    const scope = 'user-read-private user-read-email user-top-read'
    const redirect_uri = 'http://192.168.1.91:3000'
    const state = randomString(16)
    return Response.redirect("https://accounts.spotify.com/authorize?response_type="+response_type+"&client_id="+client_id+"&scope="+scope+"&redirect_uri="+redirect_uri+"&state="+state)
}