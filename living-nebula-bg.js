(function () {
    function startNebula() {
        if (!window.THREE) {
            console.error("THREE.js 未加载，星云背景无法启动。");
            return;
        }

        let canvas = document.getElementById("living-nebula-bg");

        if (!canvas) {
            canvas = document.createElement("canvas");
            canvas.id = "living-nebula-bg";
            document.body.prepend(canvas);
        }

        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: false
        });

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const clock = new THREE.Clock();

        const vertexShader = `
            void main() {
                gl_Position = vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            precision highp float;

            uniform vec2 iResolution;
            uniform float iTime;
            uniform vec2 iMouse;

            float random(vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
            }

            float noise(vec2 p) {
                vec2 i = floor(p);
                vec2 f = fract(p);
                vec2 u = f * f * (3.0 - 2.0 * f);

                return mix(
                    mix(random(i), random(i + vec2(1.0, 0.0)), u.x),
                    mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x),
                    u.y
                );
            }

            float fbm(vec2 p) {
                float v = 0.0;
                float a = 0.5;

                for (int i = 0; i < 6; i++) {
                    v += a * noise(p);
                    p *= 2.0;
                    a *= 0.5;
                }

                return v;
            }

            void main() {
                vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;

                // 鼠标位置转换到和 uv 一样的坐标系
                vec2 mouse = (iMouse - 0.5 * iResolution.xy) / iResolution.y;

                float time = iTime * 0.16;

                // 关键：所有旋涡、黑洞、星云中心都围绕 mouse，而不是画面中心
                vec2 local = uv - mouse;
                float d = length(local);

                // 鼠标中心附近产生黑洞吸附 / 引力弯曲
                vec2 dir = normalize(local + 0.0001);
                float gravity = smoothstep(0.65, 0.02, d);
                local -= dir * gravity * 0.18;

                // 旋转也围绕鼠标位置
                float angle = time * 1.4 + gravity * 2.8;
                mat2 rot = mat2(
                    cos(angle), -sin(angle),
                    sin(angle),  cos(angle)
                );

                vec2 p = rot * local;

                // 星云流体层
                float c1 = fbm(p * 2.2 + vec2(time, -time));
                float c2 = fbm(p * 4.3 - vec2(-time * 0.8, time * 0.9));
                float c3 = fbm(p * 7.2 + vec2(time * 0.4, time * 0.6));

                vec3 deepSpace = vec3(0.002, 0.006, 0.035);
                vec3 magenta = vec3(0.95, 0.12, 0.48);
                vec3 blue = vec3(0.10, 0.25, 0.95);
                vec3 teal = vec3(0.00, 0.85, 0.72);

                vec3 color = deepSpace;
                color = mix(color, magenta, smoothstep(0.36, 0.66, c1));
                color = mix(color, blue, smoothstep(0.44, 0.74, c2) * 0.72);
                color = mix(color, teal, smoothstep(0.56, 0.82, c3) * 0.40);

                // 黑洞核心：永远紧贴鼠标
                float blackCore = smoothstep(0.18, 0.035, d);
                color = mix(color, vec3(0.0, 0.0, 0.0), blackCore);

                // 黑洞外圈发光
                float ring = smoothstep(0.18, 0.12, d) - smoothstep(0.30, 0.20, d);
                vec3 ringColor = vec3(0.2, 0.9, 1.0) + vec3(0.55, 0.05, 0.8);
                color += ring * ringColor * 0.9;

                // 鼠标附近整体增亮，突出“中心跟随”
                float glow = smoothstep(0.85, 0.05, d);
                color += glow * vec3(0.22, 0.12, 0.35);

                // 页面边缘暗角
                float vignette = smoothstep(1.45, 0.18, length(uv));
                color *= vignette;

                gl_FragColor = vec4(color, 1.0);
            }
        `;

        const uniforms = {
            iTime: { value: 0 },
            iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            iMouse: { value: new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2) }
        };

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms
        });

        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
        scene.add(mesh);

        function resize() {
            const width = window.innerWidth;
            const height = window.innerHeight;

            renderer.setSize(width, height, false);
            uniforms.iResolution.value.set(width, height);
        }

        function moveCenter(event) {
            const x = event.clientX;
            const y = window.innerHeight - event.clientY;

            // 这里是关键：鼠标一动，黑洞中心立即更新，没有缓动，没有延迟
            uniforms.iMouse.value.set(x, y);
        }

        function animate() {
            uniforms.iTime.value = clock.getElapsedTime();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        window.addEventListener("resize", resize);
        window.addEventListener("pointermove", moveCenter, { passive: true });

        resize();
        animate();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", startNebula);
    } else {
        startNebula();
    }
})();
