precision mediump float;

varying lowp vec4 v_color;

void main() {
//    vec4 c = v_color;
//    gl_FragColor = vec4(c.r > c.g && c.r > c.b ? 1.0 : 0.0,
//    c.g > c.r && c.g > c.b ? 1.0 : 0.0,
//    c.b > c.r && c.b > c.g ? 1.0 : 0.0,
//    c.a);

    gl_FragColor = v_color;
}