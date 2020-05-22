var btnOpen = document.querySelector(".js-open");
var btnClose = document.querySelector(".js-close");
var modal = document.querySelector(".js-modal");
var modalChildren = modal.children;

function hideModal() {
    dynamics.animate(
        modal, {
            opacity: 0,
            translateY: 100
        }, {
            type: dynamics.spring,
            frequency: 50,
            friction: 600,
            duration: 1500
        }
    );
}

function showModal() {
    // Define initial properties
    dynamics.css(modal, {
        opacity: 0,
        scale: 0.5
    });

    // Animate to final properties
    dynamics.animate(
        modal, {
            opacity: 1,
            scale: 1
        }, {
            type: dynamics.spring,
            frequency: 300,
            friction: 400,
            duration: 1000
        }
    );
}


function showBtn() {
    dynamics.css(btnOpen, {
        opacity: 0
    });

    dynamics.animate(
        btnOpen, {
            opacity: 1
        }, {
            type: dynamics.spring,
            frequency: 300,
            friction: 400,
            duration: 800
        }
    );
}

function showModalChildren() {
    // Animate each child individually
    for (var i = 0; i < modalChildren.length; i++) {
        var item = modalChildren[i];

        // Define initial properties
        dynamics.css(item, {
            opacity: 0,
            translateY: 30
        });

        // Animate to final properties
        dynamics.animate(
            item, {
                opacity: 1,
                translateY: 0
            }, {
                type: dynamics.spring,
                frequency: 300,
                friction: 400,
                duration: 1000,
                delay: 100 + i * 40
            }
        );
    }
}

function toggleClass(element, className) {
    const check = new RegExp("(\\s|^)" + className + "(\\s|$)");
    if (check.test(element.className)) {
        element.className = element.className.replace(check, " ").trim();
    } else {
        element.className += " " + className;
    }


}

function toggleClasses() {

    toggleClass(btnOpen, "is-active");
    toggleClass(modal, "is-active");
}

// Open nav when clicking sandwich button
btnOpen.addEventListener("click", function () {
    toggleClasses();
    showModal();
    showModalChildren();
});

// Open nav when clicking sandwich button
btnClose.addEventListener("click", function () {
    hideModal();
    dynamics.setTimeout(toggleClasses, 500);
    dynamics.setTimeout(showBtn, 500);
});
