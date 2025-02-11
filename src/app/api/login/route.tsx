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
    const client_id = process.env.NEXT_PUBLIC_CLIENT_ID
    const scope = 'user-read-private user-read-email user-top-read'
    const redirect_uri = process.env.NEXT_PUBLIC_URL
    const state = randomString(16)
    return Response.redirect("https://accounts.spotify.com/authorize?response_type="+response_type+"&client_id="+client_id+"&scope="+scope+"&redirect_uri="+redirect_uri+"&state="+state)
}