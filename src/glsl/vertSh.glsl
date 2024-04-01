attribute vec2 a_position;
attribute vec4 a_color;

uniform vec2 u_resolution;
uniform mat3 u_matrix;

varying lowp vec4 v_color;

void main() {
    vec2 position = (u_matrix * vec3(a_position, 1)).xy;

    vec2 zeroToOne = position / u_resolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = (zeroToTwo - 1.0) * vec2(1, -1);

    gl_Position = vec4(clipSpace, 0, 1);

    v_color = a_color;
}