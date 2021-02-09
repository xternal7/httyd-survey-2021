export async function resolvePing(req: any, res: any) {
  res.send({status: 200, message: 'pong'});
}