const requests = new Map<string, { count: number; resetAt: number }>();

interface RateLimitOptions {
  limit?: number;
  windowMs?: number;
}

export function rateLimit(
  key: string,
  { limit = 10, windowMs = 15 * 60 * 1000 }: RateLimitOptions = {}
): { success: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = requests.get(key);

  if (!entry || now > entry.resetAt) {
    const resetAt = now + windowMs;
    requests.set(key, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  requests.set(key, entry);
  return { success: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return request.headers.get('x-real-ip') || 'unknown';
}
