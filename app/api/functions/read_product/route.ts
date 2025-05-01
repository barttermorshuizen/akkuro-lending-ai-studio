import { readProduct } from '@/services/readProduct';
import { ConfigurationError, ServiceUnavailableError, ProductNotFoundError } from '@/types/errors';

export async function GET() {
  try {
    console.log("read_product API called");
    const product = await readProduct();
    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error("Error in read_product API:", error);

    if (error instanceof ConfigurationError) {
      return new Response(
        JSON.stringify({
          error: 'Configuration error',
          message: error.message,
          code: 'CONFIG_ERROR'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (error instanceof ServiceUnavailableError) {
      return new Response(
        JSON.stringify({
          error: 'Service unavailable',
          message: error.message,
          code: 'SERVICE_UNAVAILABLE'
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (error instanceof ProductNotFoundError) {
      return new Response(
        JSON.stringify({
          error: 'Product not found',
          message: error.message,
          code: 'NOT_FOUND'
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: errorMessage,
        code: 'INTERNAL_ERROR'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}