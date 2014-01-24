YUI({
//        filter: 'debug', combine: false,
        gallery: 'gallery-2013.06.26-23-09'
}).use(
        'gallery-accordion-horiz-vert',
        'anim-base',
        'node-focusmanager','node','event',
function(Y)
{       
        // mouseenter & leaves ->
        var whatmenu = Y.all('#whatmenu');

        // bshares header logo mouse
        Y.all('#headerLogo').on('mouseenter', function(){
                Y.all('.what-menu').setStyle('opacity', 1);
                whatmenu.addClass('show-what-menu');
                Y.one('#headerLogo').setStyle('opacity', 0.888);
        });
        Y.all('#headerLogo').on('mouseleave', function(){
                Y.one('.what-menu').setStyle('opacity',0.444);
                whatmenu.removeClass('show-what-menu');
                Y.one('#headerLogo').setStyle('opacity', 0.444);
        });
        //bshares menu mouse
        Y.all('.what-menu').on('mouseenter', function(){
                Y.one('.what-menu').setStyle('opacity', 1);
                Y.one('#headerLogo').setStyle('opacity', 1);
        });
        Y.all('.what-menu').on('mouseleave', function(){
                Y.one('.what-menu').setStyle('opacity', 0.444);
                whatmenu.removeClass('show-what-menu');
                Y.one('#headerLogo').setStyle('opacity', 0.444);
        });

        function scrolledPast(){
                whatmenu.addClass('show-what-menu');
        }

        function scrolledTop(){
                whatmenu.removeClass('show-what-menu');       
        }

        /*
        Y.one('.video-header').on({
                mouseover : function(){ if(document.body.scrollTop > 571) scrolledTop();},
                mouseout  : function(){ if(document.body.scrollTop > 571) scrolledPast();}
        });
        */

        Y.on('scroll', function(){
                document.documentElement.scrollTop /* || document.body.scrollTop */ < 292 ?
                        scrolledTop()
                :   scrolledPast();
        });

        /*
        Y.on('domready', function()
        {
                
                function iconHover(hoverElm, icon1, icon2){
                        Y.one(icon1).hide();        
                        Y.one(hoverElm).on({
                                mouseover : function(){
                                        Y.one(icon2).hide();
                                        Y.one(icon1).show();        
                                },
                                mouseout  : function(){
                                        Y.one(icon2).show();
                                        Y.one(icon1).hide();
                                }
                        });        
                }

                iconHover('#footPin','#footPin15','#footPin16');
                iconHover('#footCall','#footPhone5','#footPhone');
                iconHover('#footMail','#footEmail8','#footEmail');
                iconHover('#twIcon','#footTwitter5','#footTwitter4');
                iconHover('#fbIcon','#footFacebook5','#footFacebook4');
                iconHover('#gpIcon','#footGplus5','#footGplus4');
                iconHover('#inIcon','#footLinkedin5','#footLinkedin4');
        
        });
        */


        // Mobile menu 
        /*
        Y.one('select').on('change', function(){
                var selIndex = this.get("selectedIndex");
                var attrOpts = this.get("options");
                window.location = attrOpts.item(selIndex).get('value');
        });
        // http://yuilibrary.com/yui/docs/attribute/attribute-event.html
        */

        // accordion start
        function onTitleClicked(e, a)
        {
                var t = e.target;
                var i = a.findSection(e.target);
                if (i >= 0)
                {
                        a.toggleSection(i);
                }
        }

        function updateFocusMgr()
        {
                var a    = this;
                var keys = a.get('horizontal') ?
                        { next: "down:39", previous: "down:37" } :
                        { next: "down:40", previous: "down:38" };

                var node = a.get('contentBox');
                node.unplug(Y.Plugin.NodeFocusManager);
                node.plug(Y.Plugin.NodeFocusManager,
                {
                        descendants: '.yui3-accordion-title a',
                        keys:        keys,
                        circular:    false,
                        focusClass:
                        {
                                className: a.getClassName('title', 'focused'),
                                fn: function (node)
                                {
                                        return node.get('parentNode');
                                }
                        }
                });
        }

        var vm = new Y.Accordion(
        {
                srcNode: '#accordion-test-vert-markup-content',
                replaceTitleContainer:   false,
                replaceSectionContainer: false,
                allowMultipleOpen:       true
        });

        Y.on('domready', function()
        {
                vm.render('#accordion-test-vert-markup');
                Y.delegate('click', onTitleClicked, '#accordion-test-vert-markup', '.my-title-vert', null, vm);

                updateFocusMgr.call(vm);

                vm.on('insert', function()
                {
                        Y.later(1, this, updateFocusMgr);
                });
                vm.on('remove', updateFocusMgr);

                Y.one('.vision-vert').ancestor().addClass('vision-title');
                Y.one('.vision-inner').ancestor().addClass('vision-title');
                Y.one('.mission-vert').ancestor().addClass('mission-title');
                Y.one('.mission-inner').ancestor().addClass('mission-title');
                Y.one('.job-vert').ancestor().addClass('job-title');
                Y.one('.job-inner').ancestor().addClass('job-title');
                // accordion end

                
                Y.one('#storyLink').on('click', function(){
                        if(Y.one('.mission-title').hasClass('yui3-accordion-closed')){
                                Y.one('.mission-vert').simulate('click');
                        }
                });
                

        });
});