// Defines
#define PI 3.14159265358979323846
#define HALF_PI 1.57079632675
#define TWO_PI 6.283185307


///////////////////////////////////////////////////////////////////////////////
//// COLOR CONVERSION
///////////////////////////////////////////////////////////////////////////////

// All components are in the range [0…1], including hue.
vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

// All components are in the range [0…1], including hue.
vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}


///////////////////////////////////////////////////////////////////////////////
//// VALUE MAPPING
///////////////////////////////////////////////////////////////////////////////

float map(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

vec2 map(vec2 value, vec2 inMin, vec2 inMax, vec2 outMin, vec2 outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

vec3 map(vec3 value, vec3 inMin, vec3 inMax, vec3 outMin, vec3 outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

vec4 map(vec4 value, vec4 inMin, vec4 inMax, vec4 outMin, vec4 outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}


///////////////////////////////////////////////////////////////////////////////
//// MATH
///////////////////////////////////////////////////////////////////////////////

// float round(float inVal) {
//   return sign(inVal) * floor(abs(inVal) + 0.5);
// }

// Normalized cos value between 0 and 1
float cosn(float v) {
  return (cos(v) + 1.0) / 2.0;
}

// Normalized sin value between 0 and 1
float sinn(float v) {
  return (sin(v) + 1.0) / 2.0;
}

// Normalized triangle wave pattern between 0 and 1
float triwave(float x) {
  return abs(2. * fract(x) - 1.0);
}


///////////////////////////////////////////////////////////////////////////////
//// TRANSFORMATION
///////////////////////////////////////////////////////////////////////////////

mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),
              sin(_angle),cos(_angle));
}


///////////////////////////////////////////////////////////////////////////////
//// RANDOMNESS
///////////////////////////////////////////////////////////////////////////////

float rand(float x) {
  return fract(sin(x) * 100000.0);
}

// Book of shaders randomness function
//   https://bit.ly/39ArB4E
float rand0(vec2 p) {
  vec2 K1 = vec2(
    12.9898,
    78.233
  );
  return fract(sin(dot(p, K1)) * 43758.5453123);
}

// Stack overflow randomness
//   https://bit.ly/3ifugEU
float rand1(vec2 p)
{
  vec2 K1 = vec2(
    23.14069263277926, // e^pi (Gelfond's constant)
    2.665144142690225  // 2^sqrt(2) (Gelfondâ€“Schneider constant)
  );
  return fract(cos(dot(p, K1)) * 12345.6789);
}