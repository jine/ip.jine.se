import { IncomingMessage } from 'http';
import * as net from 'net';

export function getClientIP(req: IncomingMessage): string | undefined {
  const cfIP = req.headers['cf-connecting-ip'] as string;
  if (cfIP) return cfIP;
  const forwarded = req.headers['x-forwarded-for'] as string;
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIP = req.headers['x-real-ip'] as string;
  if (realIP) return realIP;
  return req.socket?.remoteAddress;
}

export function isIPv4(ip: string): boolean {
  return net.isIPv4(ip);
}

export function isIPv6(ip: string): boolean {
  return net.isIPv6(ip);
}