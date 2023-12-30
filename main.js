var program;

function main() {
    // Retrieve <canvas> element
    var canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    gl = WebGLUtils.setupWebGL(canvas, undefined);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // Initialize shaders
    program = initShaders(gl, 'vshader', 'fshader');
    gl.useProgram(program);

    // Set viewport
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Set clear color
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Initialize image variables
    var imageOne = document.getElementById('imageOne');
    var imageTwo = document.getElementById('imageTwo');
    var imageThree = document.getElementById('imageThree');

    // Button click event listeners
    imageOne.addEventListener('click', function () {
        render(1.0);
    });
    imageTwo.addEventListener('click', function () {
        render(2.0);
    });
    imageThree.addEventListener('click', function () {
        render(3.0);
    });

    // Create square as strip of two triangles
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0]), gl.STATIC_DRAW);

    // Initial render
    render(1.0);
}

function render(image) {
    // Set image as one, two, or three
    gl.uniform1f(gl.getUniformLocation(program, 'image'), image);

    // Add position data to WebGL
    gl.aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(gl.aPosition);
    gl.vertexAttribPointer(gl.aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
