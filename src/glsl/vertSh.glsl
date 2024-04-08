attribute vec3 a_position;
attribute vec4 a_color;

uniform vec2 u_resolution;
uniform mat4 u_matrix;

varying lowp vec4 v_color;

void main() {
    vec3 position = (u_matrix * vec4(a_position, 1)).xyz;

    vec3 zeroToOne = position / vec3(u_resolution, 400);
    vec3 zeroToTwo = zeroToOne * 2.0;
    vec3 clipSpace = (zeroToTwo - 1.0) * vec3(1, -1, 1);

    gl_Position = vec4(clipSpace, 1);

    v_color = a_color;
}