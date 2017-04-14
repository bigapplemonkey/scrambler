$(document).on('ready',
    function() {
        'use strict';

        //Determining scrambling parameters from received HTML
        var chars = [],
            charsInBetw = [],
            scramblingChars = '',
            count = 0,
            firstLineHiddenCharts = 0,
            charsPerLine = 0,
            minCharsInBetw = 0,
            maxCharsInBetw = 0,
            unscrambledText = '',
            $spans = $('span'),
            $firstLineBreak = $('br').first(),
            $body = $('body');

        $spans.each(function() {
            if ($(this).css('display') === 'inline') {
                ++count;
                if (!chars.includes($(this).text())) chars.push($(this).text());
            } else {
                if (!charsInBetw.includes(count)) charsInBetw.push(count);
                count = 0;
            }
        });

        //Chars to use for scrambling
        scramblingChars = chars.join('');

        //Chars in between message letter range
        charsInBetw = charsInBetw.sort(function(a, b) {
            return a - b;
        });
        minCharsInBetw = charsInBetw[0];
        maxCharsInBetw = charsInBetw[charsInBetw.length - 1];

        //Chars per line
        firstLineHiddenCharts = $('br').first().prevAll('span:hidden').length;
        charsPerLine = $firstLineBreak.index() - $spans.first().index() - firstLineHiddenCharts;

        //Inserting elements to the DOM to scramble/unscramble
        $body.html(
            '<div><button id="unscramble-button" type="button">Unscramble Me!</button>' +
            '<button id="scramble-button" type="button">Scramble Me!</button>' +
            '<div><textarea rows="4" cols="50" hidden></textarea></div><div id="message"></div><hr>' +
            '<h2>Output:</h2><div id="result">' + $body.html() + '</div></div>'
        );

        //Caching selectors
        var $resultContianer = $('#result'),
            $scrambleButton = $('#scramble-button'),
            $unscrambleButton = $('#unscramble-button'),
            $textArea = $('textarea'),
            $message = $('#message');

        $scrambleButton.prop('disabled', true);
        $('button').css('margin', '5px');

        $('#unscramble-button').on('click', function() {
            $unscrambleButton.prop('disabled', true);

            //Unscrambelling
            $resultContianer.text(unscrambleMe($body));

            $textArea.val(unscrambledText);
            $textArea.show();
            $scrambleButton.prop('disabled', false);
        });


        $('#scramble-button').on('click', function() {
            $message.html('');
            $textArea.css('border-color', '');

            if ($textArea.val()) {
                $scrambleButton.prop('disabled', true);

                //Scrambelling
                $resultContianer.html(scrambleMe($textArea.val()));

                $textArea.hide();
                $unscrambleButton.prop('disabled', false);
            } else {
                $textArea.css('border-color', 'red');
                $message.html('Nothing to scramble!!!');
                $resultContianer.html('');
            }
        });

        /**
         * Unscramble the text inside the DOM elements
         * @param {JQuery Selector} $htmlToBeUnsrambled
         * @return {String} unscrambledText
         */
        function unscrambleMe($htmlToBeUnsrambled) {
            unscrambledText = $htmlToBeUnsrambled.find('span:hidden').text();
            return unscrambledText;
        }

        /**
         * Scramble the text from a string
         * @param {String} toBeSrambled
         * @return {String} scrambledHTML
         */
        function scrambleMe(toBeSrambled) {
            var unhiddenCharCount = 0,
                scrambledHTML = '';

            $.each(toBeSrambled.split(''), function(index, value) {
                scrambledHTML += '<span hidden>' + value + '</span>';

                var randomCharCount = Math.floor(Math.random() * (maxCharsInBetw - minCharsInBetw + 1)) + minCharsInBetw;
                for (var i = 0; i < randomCharCount; i++) {
                    scrambledHTML += '<span>' + scramblingChars.charAt(Math.floor(Math.random() * scramblingChars.length)) + '</span>';
                    ++unhiddenCharCount;
                    if (unhiddenCharCount % charsPerLine === 0) scrambledHTML += '<br>';
                }
            });

            return scrambledHTML;
        }

        //Putting the scrambler object in the global scope
        window.scrambler = {
            scrambleMe: scrambleMe,
            unscrambleMe: unscrambleMe
        };
    });
